pipeline {
    agent { docker { image 'node:6.3' } }
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
                sh 'npm run start-dev'

            }
        }
    }
}