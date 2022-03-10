node('master'){
    weekly()
}
def weekly(){
    stage("weekly"){
        sh '''
            docker ps
        '''
    }
}