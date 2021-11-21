pipeline{
    agent { "master" }
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