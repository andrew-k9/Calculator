function higherPrecedence(a,b){
	let response = false;

	if(isHighPrecedence(a) != isHighPrecedence(b)){
		if(isHighPrecedence(a)){
			response = true;
		}
	} else {
		response = true;
	}

	return response;
}

function isHighPrecedence(char){
	return (char === '/' || char === '*' ||char === '%');
}

function isOperator(char){
	return (char === '/' || char === '*' ||char === '%' ||char === '+' || char === '-' || char === '(' || char === ')')
}

function getInteger(str,start){
	let temp = '';
	let i = start;
	let response = [];

	while((isNaN(str[i]) === false || str[i] === '.') && i < str.length){
		temp += str[i];
		++i;
	}

	response.push(temp);
	response.push(i - 1);

	return response;
}

function postfix(str){
	let response = [];
	let stack = [];
	let len = str.length;

	/*
	stack.push('(');
	str += ')';
	*/

	for(let i = 0; i < len; ++i){

		if(isOperator(str[i])){
			if(str[i] === '('){
				stack.push('(');
			} else if(str[i] === ')'){
				while(stack.length > 0 && stack[stack.length - 1] != '('){
					response.push(stack.pop());
				}
				stack.pop();
			} else {
				if(stack.length === 0){
					stack.push(str[i])
				} else {
					while(higherPrecedence(stack[stack.length - 1],str[i]) && stack.length > 0){
						response.push(stack.pop());
					}
					stack.push(str[i]);
				}
			}
		}else {
			let temp = getInteger(str,i);
			response.push(parseFloat(temp[0]));
			i = temp[1];
		}
	}

	while(stack.length > 0){
		response.push(stack.pop());
	}

	console.log(response);

	return response;
}

function calculator(array){
	let ans = 0;
	let stack = [];
	let a = 0, b = 0;

	if(array.length === 1){
		if(isOperator(array[0])) {
			return 'Invalid'
		}else{ 
			return array[0];
		}
	}

	for(let i = 0; i < array.length; ++i){
		if(typeof array[i] === 'number'){
			stack.push(array[i]);
		}else {
			switch(array[i]){
				case '+':
					ans = stack.pop() + stack.pop();
					break;
				case '-':
					ans = stack.pop() - stack.pop();
					break;
				case '*':
					ans = stack.pop() * stack.pop();
					break;
				case '/':
					b = stack.pop();
					a = stack.pop();
					ans = a / b;
					if (isNaN(ans)){
						return 'Infinity';
					}
					break;
				case '%':
					b = stack.pop();
					a = stack.pop();
					ans = a % b;
					break;
				default:
					return 'Error';
					break;
			}
			stack.push(ans);
		}
	}
	return Math.round(ans*1000)/1000 ;
}

let input = document.getElementById('textInput');
let buttons = document.querySelectorAll('button');

buttons.forEach((button) => {
	button.addEventListener('click', (e) => {

		let value = button.innerHTML;

		if(input.value === '0'){
			input.value = '';
		}

		if(value === 'AC'){
				input.value = '0';
			}
		if(value === 'DEL'){
				input.value = input.value.slice(0,-1);
			}

		if(value === '=' && input.value.length > 2){
			input.value = calculator(postfix(input.value.replace(/\s/g, '')));
		} else if((isOperator(value) || value === '.') && input.value.length > 1){

			if(isOperator(input.value[input.value.length - 1 ]) === false){
				input.value += value;
			} 
		}else {
			if(value != '=' && value != 'AC' && value !='DEL'){
				input.value += value;
			}
		}

	});
});