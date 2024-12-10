# backend/face_analysis/processor.py
import numpy as np
from PIL import Image
import torch
from torchvision import transforms
from facenet_pytorch import MTCNN, InceptionResnetV1

class FacePreferenceAnalyzer:
    def __init__(self):
        # Initialize face detection and embedding models
        self.mtcnn = MTCNN(
            image_size=160, 
            margin=10, 
            keep_all=True,
            device='cuda' if torch.cuda.is_available() else 'cpu'
        )
        
        # Load pre-trained FaceNet model
        self.resnet = InceptionResnetV1(pretrained='vggface2').eval()
        
        # Standard image transformations
        self.transform = transforms.Compose([
            transforms.Resize((160, 160)),
            transforms.ToTensor(),
            transforms.Normalize(mean=[0.5, 0.5, 0.5], std=[0.2, 0.2, 0.2])
        ])

    def extract_face_embedding(self, image_path):
        """Extract face embedding vector from image"""
        try:
            # Load and convert image
            img = Image.open(image_path).convert('RGB')
            
            # Detect face and get bounding boxes
            boxes, _ = self.mtcnn.detect(img)
            
            if boxes is None or len(boxes) == 0:
                return None, "No face detected in image"
            
            # Get face embeddings
            face = self.mtcnn(img)
            if face is None:
                return None, "Failed to process face"
                
            # Generate embedding vector
            with torch.no_grad():
                embedding = self.resnet(face.unsqueeze(0))
                
            return embedding[0].numpy(), None
            
        except Exception as e:
            return None, f"Error processing image: {str(e)}"

    def calculate_similarity(self, embedding1, embedding2):
        """Calculate cosine similarity between two face embeddings"""
        return np.dot(embedding1, embedding2) / (
            np.linalg.norm(embedding1) * np.linalg.norm(embedding2)
        )

    def find_similar_faces(self, preference_embedding, candidate_embeddings, 
                          threshold=0.6):
        """Find similar faces based on preference embedding"""
        similarities = []
        
        for idx, candidate_embedding in enumerate(candidate_embeddings):
            similarity = self.calculate_similarity(
                preference_embedding, 
                candidate_embedding
            )
            
            if similarity >= threshold:
                similarities.append({
                    'index': idx,
                    'similarity': float(similarity)
                })
        
        # Sort by similarity score
        return sorted(similarities, key=lambda x: x['similarity'], reverse=True)

class PreferenceManager:
    def __init__(self):
        self.analyzer = FacePreferenceAnalyzer()
        self.preference_cache = {}  # User ID -> preference embedding
        
    def store_user_preference(self, user_id, image_path):
        """Store a user's facial preference"""
        embedding, error = self.analyzer.extract_face_embedding(image_path)
        
        if error:
            return {'success': False, 'error': error}
            
        self.preference_cache[user_id] = embedding
        return {'success': True}
        
    def find_matches(self, user_id, candidate_images, top_k=20):
        """Find matches based on stored preference"""
        if user_id not in self.preference_cache:
            return {'success': False, 'error': 'No preference stored'}
            
        preference = self.preference_cache[user_id]
        matches = []
        
        for idx, image_path in enumerate(candidate_images):
            embedding, error = self.analyzer.extract_face_embedding(image_path)
            if error:
                continue
                
            similarity = self.analyzer.calculate_similarity(preference, embedding)
            matches.append({
                'index': idx,
                'similarity': float(similarity)
            })
            
        # Sort and return top K matches
        matches.sort(key=lambda x: x['similarity'], reverse=True)
        return {
            'success': True,
            'matches': matches[:top_k]
        }