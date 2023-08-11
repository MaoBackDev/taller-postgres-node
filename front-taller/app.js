const form = document.getElementById('form-create');


const getStudents = async () => {

  try {
    const response = await fetch('http://localhost:8080/students/');
    const data = await response.json();
    return data;
  } catch (error) {
    console.log(error)
  }
}


(async () => {
  const students = await getStudents();
  console.log(students)
  
  form.addEventListener('submit', async (e) => {
    e.preventDefault();

    const name = form.name.value;
    const age = Number(form.age.value);

    try {
      const response = await fetch('http://localhost:8080/students/', {
        method: 'POST',
        headers: {
          "Content-type": "application/json"
        },
        body: JSON.stringify({name, age})
      });
      const data = await response.json();
      console.log(data)
    } catch (error) {
      console.log(error)
    }

  })

})()



