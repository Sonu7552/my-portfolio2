pipeline {
    agent any

    environment {
        IMAGE_NAME = "devops-portfolio"
    }

    stages {

        stage('Checkout Code') {
            steps {
                checkout scm
            }
        }

        stage('Build Docker Image') {
            steps {
                script {
                    echo 'Building Docker image...'
                    sh "docker build -t ${IMAGE_NAME}:latest ."
                }
            }
        }

        stage('Deploy Container') {
            steps {
                script {
                    echo 'Deploying new container...'

                    // Stop old container if running
                    sh "docker stop ${IMAGE_NAME} || true"

                    // Remove old container
                    sh "docker rm ${IMAGE_NAME} || true"

                    // Run new container
                    sh """
                        docker run -d \
                        -p 3000:3000 \
                        --name ${IMAGE_NAME} \
                        --restart always \
                        ${IMAGE_NAME}:latest
                    """
                }
            }
        }
    }

    post {
        always {
            echo 'Cleaning unused Docker images...'
            sh "docker image prune -f"
        }
    }
}
