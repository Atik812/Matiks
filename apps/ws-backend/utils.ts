import type { Question, questionSign } from "./types";

export const generateQuestion = (): Question[] => {
    const sign = ["MINUS", "PLUS", "DIVIDE","MULTIPLICATION"];
    const questions : Question[] =[];
    for(let i=0; i<= 60; i++){
        

        
        const randomoperation1 = Math.floor(Math.random()*10);
        const randomoperation2 = Math.floor(Math.random()*20);
        const randomSign = sign[Math.floor(Math.random()*sign.length)]! as questionSign;

        let answer;
        if(randomSign == "DIVIDE"){
            answer = randomoperation1/randomoperation2;
        } else if (randomSign == "MINUS"){
            answer = randomoperation1 - randomoperation2;
        } else if(randomSign == "MULTIPLICATION"){
            answer = randomoperation1*randomoperation2;
        } else {
            answer = randomoperation1 + randomoperation2;
        }
    
        questions.push({
            id: crypto.randomUUID(),
            sign: randomSign,
            operation1: randomoperation1,
            operation2: randomoperation2,
            answer,
        })
    }

    return questions;
}