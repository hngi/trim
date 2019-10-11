pipeline {
    agent { docker { image 'node:10.16.3' } }
    stages {
        stage('Build') {
            steps {
                echo 'Building'
                sh 'sudo npm install'
            }
        }
        stage('Test') {
            steps {
                echo 'Testing'
                sh 'sudo npm test'

            }
        }
        stage('Deploy'){
            steps {
                echo 'Deploying'
                sh 'sudo npm run start-dev'

            }
        }
    }
}