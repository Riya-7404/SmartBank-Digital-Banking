<html>
<head>
    <title>SmartBank Login</title>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
</head>
<body class="bg-dark text-white">
    <div class="container mt-5">
        <h2>Welcome Back, Riya!</h2>
        <form action="LoginServlet" method="POST">
            <input type="text" name="username" placeholder="Username" class="form-control mb-3">
            <input type="password" name="password" placeholder="Password" class="form-control mb-3">
            <button type="submit" class="btn btn-primary">Login Now</button>
        </form>
    </div>
</body>
</html>