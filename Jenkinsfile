pipeline {
    agent any
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                sh 'npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
                sh 'npm test'

            }
        }
        stage('Deploy'){
            steps {
                echo 'Deploying'
                sh 'npm run build && npm start'

            }
        }
    }
}