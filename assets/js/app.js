const cl = console.log;


const stdform = document.getElementById("stdform");
const fnameControl = document.getElementById("fname");
const lnameControl = document.getElementById("lname");
const emailControl = document.getElementById("email")
const contactcontrol = document.getElementById("contact");
const stdContainer = document.getElementById("stdContainer");
const stdTable = document.getElementById("stdTable");
const noStdInfo = document.getElementById("noStdInfo");
const updateBtn = document.getElementById("updateBtn");
const submitBtn = document.getElementById("submitBtn");


let stdArr = [];

generateUuid = () => {
	return (
		String('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx')
	).replace(/[xy]/g, (character) => {
		const random = (Math.random() * 16) | 0;
		const value = character === "x" ? random : (random & 0x3) | 0x8;

		return value.toString(16);
	});
};

generateUuid()


const checkStdCount =()=>{
    if(stdArr.length > 0){
		noStdInfo.classList.add("d-none");
		stdTable.classList.remove("d-none")
	}else{
		noStdInfo.classList.remove("d-none");
		stdTable.classList.add("d-none")
	}
}

const onEdit = (ele) =>{
   let editId = ele.closest("tr").id;
    cl(editId);
	localStorage.setItem("editId",editId);
	let obj= stdArr.find(std => std.stdId === editId);
	cl(obj)
	fnameControl.value = obj.fname;
	lnameControl.value = obj.lname;
	emailControl.value = obj.email;
	contactcontrol.value = obj.contact;
	updateBtn.classList.remove("d-none");
	submitBtn.classList.add("d-none");

}

const onDelete = (ele) =>{
	let grtConfirm = confirm("Are you sure you want to remove this item student	?");
	if(grtConfirm){
		deleteId = ele.closest("tr").id
	//cl(deleteId);
	let getIndex = stdArr.findIndex(std=>std.stdId === deleteId);
	stdArr.splice(getIndex, 1)  // remove from array
	localStorage.setItem("stdArr", JSON.stringify(stdArr)); // remove from databasse LS
	ele.closest("tr").remove();  //remove UI
	};
	Swal.fire({
		title: `std information is deleted succesfully`,
		icon: "success",
		timer:2000
	})
	

}
 

const addstd = (obj) =>{
	let tr = document.createElement("tr");
	tr.id = obj.stdId;
	tr.innerHTML = `
	     	
	     <td>${1}</td>
	     <td>${obj.fname}</td>
      	<td>${obj.lname}</td>
    	<td>${obj.email}</td>
	    <td>${obj.contact}</td>
	    <td><i class="fa-solid fa-pen-to-square fa-2x text-success" onclick="onEdit(this)"></i></td>
	 <td><i class="fa-solid fa-trash fa-2x text-danger" onclick="onDelete(this)"></i></td>
       `;
	stdContainer.prepend(tr);  
	let allTr = [...stdContainer.children]
	cl(allTr)
	for(let i=0; i<stdArr.length; i++){
		cl(i);
		allTr[i].firstElementChild.innerHTML = i + 1;

	}

}




const templatingOfstd = (arr) => {
	let result = ``;

	arr.forEach((std, i) => {

		result += `
	
		      <tr id="${std.stdId}">
					 <td>${i + 1}</td>
					 <td>${std.fname}</td>
					 <td>${std.lname}</td>
		    		 <td>${std.email}</td>
					 <td>${std.contact}</td>
					 <td><i class="fa-solid fa-pen-to-square fa-2x text-success" onclick="onEdit(this)"></i></td>
					 <td><i class="fa-solid fa-trash fa-2x text-danger" onclick="onDelete(this)"></i></td>
			 </tr>
	    
		`
	});
 
	stdContainer.innerHTML = result;

}

const addStd = (obj) =>{

}

if (localStorage.getItem("stdArr")) {
	stdArr = JSON.parse(localStorage.getItem("stdArr"));
	templatingOfstd(stdArr)	
	
}
checkStdCount();


const onStdAdd = (eve) => {
	eve.preventDefault();
	let newStd = {
		fname: fnameControl.value,
		lname: lnameControl.value,
		email: emailControl.value,
		contact: contactcontrol.value,
		stdId: generateUuid()
	}
	cl(newStd);
	stdArr.unshift(newStd);
	localStorage.setItem("stdArr", JSON.stringify(stdArr));
	//templatingOfstd(stdArr)
    checkStdCount();
	addstd(newStd);  
	eve.target.reset();
	Swal.fire({
		title: `${newStd.fname} ${newStd.lname} added as a new student`,
		icon: "success",
		timer:2000
	})
}

const onStdUpdate = ()=> {
	let updateId=localStorage.getItem("editId");
	let updatedObj = {
		fname: fnameControl.value,
		lname: lnameControl.value,
		email: emailControl.value,
		contact: contactcontrol.value,
		stdId:updateId
		}
	//	cl(updatedObj,updateId);
	let getIndex = stdArr.findIndex(std => std.stdId === updateId);
	    stdArr[getIndex]=updatedObj;
     	localStorage.setItem("stdArr", JSON.stringify(stdArr));
		let tr = [...document.getElementById(updateId).children];
        cl(tr)
		cl(updatedObj)
		tr[1].innerHTML = updatedObj.fname;
		tr[2].innerHTML = updatedObj.lname;
		tr[3].innerHTML = updatedObj.email;
		tr[4].innerHTML = updatedObj.contact;
		stdform.reset();
		updateBtn.classList.add("d-none");
		submitBtn.classList.remove("d-none");
		Swal.fire({
			title: `${updatedObj.fname} ${updatedObj.lname} information is updated	`,
			icon: "success",
			timer:2000
		})
		 
}


stdform.addEventListener("submit", onStdAdd);
updateBtn.addEventListener("click",onStdUpdate);