function getrandomValue(arrayObject){
    const random = Math.floor(Math.random() * arrayObject.length);
	return arrayObject[random];
}

function denseTask(){
    const milli_second = getrandomValue([100,200,300,400,500,600,700,800,900,1000]);
    const is_throwError = getrandomValue([1,2,3]) === 3;
    if(is_throwError){
        const randomError = getrandomValue(['Database connection timeout',
        'Process take too much time',
        'Unknown internal error',
        'Service not found',
        'Index out of range',
        'Access deined error']);
        throw new Error(randomError)
    }
	return new Promise((resolve,reject) => setTimeout(()=> resolve(milli_second), milli_second));
}

module.exports = {denseTask}