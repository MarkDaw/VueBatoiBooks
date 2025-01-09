<template>
    <nav>
        <ul>
            <li><router-link to="/">Home</router-link></li>
            <li><router-link to="/add-book">Add Book</router-link></li>
            <li><router-link to="/cart">Cart</router-link></li>
            <li><router-link to="/about">About</router-link></li>
        </ul>
    </nav>
</template>

<script>
export default {
    name: 'AppMenu'
}
</script>

<style scoped>


nav {
    background-color: var(--nav-background-color-light);
}

nav {
    background-color: var(--nav-background-color-dark);
}


nav {
    padding: 1rem;
    position: fixed;
    top: 0;
    left: 0;
    width: 100%;
}

ul {
    list-style-type: none;
    padding: 0;
}

li {
    display: inline;
    margin-right: 1rem;
}

a {
    text-decoration: none;
    color: white;
}

a:hover {
    text-decoration: underline;
}
</style>