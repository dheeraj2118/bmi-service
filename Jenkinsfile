pipeline{
    agent { docker { image 'node:14-alpine' } }
    stages{
        stage('build'){
            steps{
            sh """
                echo "Build stage"
            """

            }
        }
        stage('deploy'){
            steps{

        sh """
            echo "Deploy stage"
        """
            }
        }
    }
}