function gradutation(schooling) {
    return {
        EM: "Ensino Médio Completo",
        ES: "Ensino Superior Completo",
        M: "Mestrado",
        D: "Doutorado",
    }[schooling]
}

console.log(gradutation("ES"));