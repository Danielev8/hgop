node {
    def git = checkout scm
    stage("Clean") {
        sh "echo 'I solemnly swear that I know not to run this without committing changes I want to keep!'"
        sh "git clean -dfxq"
        sh "git stash"
    }
    stage("Install") {
        sh "npm install --prefix game-api"
    }
    stage("Build") {
        sh "./scripts/docker_build.sh ${git.GIT_COMMIT}"
        sh "./scripts/docker_push.sh ${git.GIT_COMMIT}"
    }
    stage("ESLint check") {
        sh "npm run eslint --prefix game-api"
    }
    stage("Unit Testing") {
        sh "npm run test:unit --prefix game-api"
    }
    build job: 'Deployment', parameters: [[$class: 'StringParameterValue', name: 'GIT_COMMIT', value: "${git.GIT_COMMIT}"]]
}