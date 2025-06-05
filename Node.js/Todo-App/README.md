## Todo Application
Build Todo Application using Node.js and React.js framework.

### Backend API
Backend Service that expose API endpoints for the frontend application.

### Frontend UI Interface
Frontend app interface that communicate with backend api endpoints.

### Building Docker Images
To build the Docker images for both frontend and backend:

1. Make sure you have Docker installed and running
2. Open a terminal and navigate to the project root
3. Run the build script:

```bash
# Make the script executable
chmod +x build-images.sh

# Build images only
./build-images.sh

# Build and push images to registry
./build-images.sh --push
```

Before pushing images, make sure to:
1. Edit the `build-images.sh` script to set your registry
2. Log in to your Docker registry:
```bash
docker login your-registry
```

### Push images to a Docker repository