const tf = require('@tensorflow/tfjs');

const trial = function(){

    
    alert("trial")
}


const loader = async(a)=>{
    model = await tf.loadGraphModel('../../src/model/model.json')
    console.log(a)
}

module.exports = loader