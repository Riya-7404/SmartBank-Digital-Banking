<%-- dashboard.jsp --%>
<%@ page import="java.sql.*" %>
<div class="card">
    <h3>Available Balance</h3>
    <h1>₹ <%= request.getAttribute("balance") %> </h1>
</div>