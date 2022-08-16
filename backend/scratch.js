// Sign In
fetch('/api/users/signin', {
    method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": "NrynoV1T-UGjpfwfjqcGa9bpFbRUVAZ2sVGI"
    },
    body: JSON.stringify({ credential: 'vqzmata', password: 'Home1993..-' })
}).then(res => res.json()).then(data => console.log(data));


// Sign Up
fetch('/api/users/signup', {
method: 'POST',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": "NrynoV1T-UGjpfwfjqcGa9bpFbRUVAZ2sVGI"
    },
    body: JSON.stringify({
        firstName: 'Alonso',
        lastName: 'Vazquez',
        email: 'vqzmata@gmail.com',
        username: 'vqzmata',
        password: 'Home1993..-'
    })
}).then(res => res.json()).then(data => console.log(data));

// Sign Out
fetch('/api/users/signout', {
    method: 'DELETE',
    headers: {
        "Content-Type": "application/json",
        "XSRF-TOKEN": "NrynoV1T-UGjpfwfjqcGa9bpFbRUVAZ2sVGI"
    }
}).then(res => res.json()).then(data => console.log(data));