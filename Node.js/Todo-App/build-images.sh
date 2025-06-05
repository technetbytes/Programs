#!/bin/bash

# Set variables
REGISTRY="your-registry"  # Change this to your registry (e.g., docker.io/username)
BACKEND_IMAGE="todo-backend"
FRONTEND_IMAGE="todo-frontend"
TAG="latest"

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print step information
print_step() {
    echo -e "${BLUE}==> $1${NC}"
}

# Function to print success messages
print_success() {
    echo -e "${GREEN}==> $1${NC}"
}

# Build Backend Image
print_step "Building backend image..."
docker build -t ${BACKEND_IMAGE}:${TAG} -f Backend/Dockerfile ./Backend

if [ $? -eq 0 ]; then
    print_success "Backend image built successfully!"
else
    echo "Error building backend image"
    exit 1
fi

# Build Frontend Image
print_step "Building frontend image..."
docker build -t ${FRONTEND_IMAGE}:${TAG} -f Frontend/Dockerfile ./Frontend

if [ $? -eq 0 ]; then
    print_success "Frontend image built successfully!"
else
    echo "Error building frontend image"
    exit 1
fi

# Optional: Tag and Push images to registry
if [ "$1" == "--push" ]; then
    print_step "Tagging images for registry..."
    docker tag ${BACKEND_IMAGE}:${TAG} ${REGISTRY}/${BACKEND_IMAGE}:${TAG}
    docker tag ${FRONTEND_IMAGE}:${TAG} ${REGISTRY}/${FRONTEND_IMAGE}:${TAG}
    
    print_step "Pushing images to registry..."
    docker push ${REGISTRY}/${BACKEND_IMAGE}:${TAG}
    docker push ${REGISTRY}/${FRONTEND_IMAGE}:${TAG}
    
    print_success "Images pushed to registry successfully!"
fi

print_success "Build process completed!"

# Print next steps
echo -e "\nNext steps:"
echo "1. Update your Kubernetes manifests with the correct image names"
echo "2. If using a private registry, create a Kubernetes secret for pulling images"
echo "3. Apply the Kubernetes manifests to deploy your application"
echo -e "\nExample commands:"
echo "kubectl create secret docker-registry regcred --docker-server=<your-registry> \\"
echo "    --docker-username=<username> --docker-password=<password>"
echo "kubectl apply -f Kubernetes/"
