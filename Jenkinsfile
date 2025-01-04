pipeline {
    agent any
    environment {
        DOCKER_HUB_USER = 'roshanalii'
        DOCKER_HUB_PASS = 'token'
        REPO_URL = 'https://github.com/RoshanAlii/NCCDB.git'
        DOCKER_IMAGE_NAME = 'roshanalii/nccdb'
        FRONTEND_PORT = '8080'
        DOCKER_CONTAINER_NAME = 'nccdb-frontend'
        WORKSPACE_PATH = 'C:/Users/Maheeza/Desktop/Roshan/backend' // Correct working directory
    }
    stages {
        stage('Clone Repository') {
            steps {
                echo 'Cloning the repository...'
                git branch: 'master', credentialsId: 'github-credentials', url: "${REPO_URL}"
            }
        }
        stage('Install Dependencies & Build Application') {
            steps {
                echo 'Installing dependencies and building the application...'
                dir("${WORKSPACE_PATH}") { // Set the correct working directory
                    bat '''
                        npm install
                        npm run build
                    '''
                }
            }
        }
        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    dir("${WORKSPACE_PATH}") { // Ensure Docker context is correct
                        bat "docker build -t ${DOCKER_IMAGE_NAME}:latest ."
                    }
                }
            }
        }
        stage('Push Docker Image to Hub') {
            steps {
                script {
                    echo 'Pushing Docker image to Docker Hub...'
                    bat """
                        echo ${DOCKER_HUB_PASS} | docker login -u ${DOCKER_HUB_USER} --password-stdin
                        docker push ${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
        stage('Deploy Locally') {
            steps {
                script {
                    echo 'Deploying the frontend locally...'
                    bat """
                        REM Stop and remove any existing container with the same name
                        docker stop ${DOCKER_CONTAINER_NAME} || true
                        docker rm ${DOCKER_CONTAINER_NAME} || true
                        
                        REM Run the new container
                        docker run -d --name ${DOCKER_CONTAINER_NAME} -p ${FRONTEND_PORT}:80 ${DOCKER_IMAGE_NAME}:latest
                    """
                }
            }
        }
    }
    post {
        always {
            echo 'Pipeline execution completed.'
        }
        success {
            echo 'Pipeline executed successfully.'
        }
        failure {
            echo 'Pipeline failed. Please check logs.'
        }
    }
}
