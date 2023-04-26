//jshint esversion:6

const express = require("express");
const bodyParser = require("body-parser");
const ejs = require("ejs");
const _ = require("lodash");

const WelcomeBlog ="Welcome to my Blog website you can write a blog and post it by adding the /compose to the url thank you hope it is useful";
const AboutMe = "Hello everyone, my name is Nimmana Shanmukha Sai. I am from Hyderabad, Telangana, India. I have created this website as a project here you can write a blog with a title and content in it and post the blog. I currently pursuing BTech 3rd year at CVR College of Engineering. hope you would like this website. ";
const ContactMe =
	"This is the contact page … My name is shanmukha sai. This is my linked in profile https://www.linkedin.com/in/shanmukha-sai-68ab53213/ this is my github profile: https://github.com/shanmukhasaisai and this is my email id: shanmukhasaisai09@gmail.com feel free to send a message";
const app = express();

app.set("view engine", "ejs");

app.use(bodyParser.urlencoded({ extended: true }));
app.use(express.static("public"));

var posts = [];

app.get("/", function (req, res) {
	res.render("home", {
		StartingContent: homeStartingContent,
		posts: posts,
	});
});

app.get("/about", function (req, res) {
	res.render("about", { aboutContent: aboutContent });
});

app.get("/contact", function (req, res) {
	res.render("contact", { contactContent: contactContent });
});

app.get("/compose", function (req, res) {
	res.render("compose");
});

app.post("/compose", function (req, res) {
	const post = {
		title: req.body.postTitle,
		content: req.body.postBody,
	};
	posts.push(post);
	res.redirect("/");
});

app.get("/posts/:postName", function (req, res) {
	const requestedTitle = _.lowerCase(req.params.postName);
	posts.forEach(function (post) {
		const storedTitle = _.lowerCase(post.title);
		if (storedTitle === requestedTitle) {
			res.render("post", {
				title: post.title,
				content: post.content,
			});
		}
	});
});

app.listen(3000, function () {
	console.log("Server started on port 3000");
});
