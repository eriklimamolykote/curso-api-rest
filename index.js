function helloWorld(){

    console.log( "Hello, World!" );

}

const saudacao = () => {

    var data = new Date();
    return data.getHours() <= 12 ? "Bom dia!" : data.getHours() <= 18 ? "Boa tarde!" : "Boa noite!";

}

// asdfghjkllkjhgfdsa
helloWorld();
console.log( `A saudação do momento é ` + saudacao() );