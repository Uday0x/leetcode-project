const sampleObj ={
    "JAVA":"public sytatic void main",
    "python":"def keyword is used",
    "c":"#onclude wla akaam hai idhar"
}

for(const [language,solutionCode] of Object.entries(sampleObj)){
    console.log(`langauge is :${language}`)
    console.log(`solutionCode is: ${solutionCode}`)
}