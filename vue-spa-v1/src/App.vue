<template>
	<div id="app">
		<div id="nav">
			<router-link to="/">Home</router-link> |
			<router-link :to="{ name: 'cocktails-add' }">Add</router-link>
		</div>

		<router-view/>
	</div>
</template>

<style>
html {
	box-sizing: border-box;
	font-size: 100%;
}

*,
*::before,
*::after {
	box-sizing: inherit;
}

pre {
	text-align: left;
}

#app {
	font-family: 'Avenir', Helvetica, Arial, sans-serif;
	-webkit-font-smoothing: antialiased;
	-moz-osx-font-smoothing: grayscale;
	text-align: center;
	color: #2c3e50;
}
#nav {
	padding: 30px;
}

#nav a {
	font-weight: bold;
	color: #2c3e50;
}

#nav a.router-link-exact-active {
	color: #42b983;
}


form {
	margin: 0 auto;
	max-width: 90vw;
	text-align: left;
	width: 20rem;
}

.input {
	margin-bottom: 1.25rem;
}

label {
	display: block;
	margin-bottom: .5rem;
}

input, select, textarea, button {
	font-family: inherit;
	font-size: .875rem;
	display: block;
	padding: .5rem;
	width: 100%;
}

button {
	font-size: 1rem;
	padding: .5rem;
}
</style>
