//*****ImportingPackage******//
const simpleGit = require("simple-git");
const path = require("path");
const fs = require("fs");
const { execSync } = require("child_process");
const git = simpleGit();

(async function createProject() {
  try {
    //***** DefaultPackageName *******//
    const projectName = "my-backend-app";

    //***** Set the project directory to a location outside `node_modules` *******//
    const projectDir = path.join(process.cwd(), "../../", projectName);

    //***** Check if the project directory already exists *******//
    if (fs.existsSync(projectDir)) {
      console.log(
        `Directory "${projectName}" already exists. Please choose a different name.`
      );
      process.exit(1);
    }

    //***** Clone your template project from GitHub *******//
    const templateRepo =
      "https://github.com/Arsalan-Ahmed-Solangi/Node-RestApi-Project-Structure.git";
    console.log(`Cloning template repository into ${projectDir}...`);
    await git.clone(templateRepo, projectDir);

    //***** Change directory to the new project folder *******//
    process.chdir(projectDir);

    //***** Delete node_modules, package.json, and package-lock.json from the parent directory *******//
    const parentDir = path.join(process.cwd(), "../"); // One level up from the current directory
    const deleteFiles = ["package.json", "package-lock.json"];

    deleteFiles.forEach((file) => {
      console.log("projectDIrecotry", parentDir);
      const filePath = path.join(parentDir, file);

      console.log("FilePath", filePath);
      if (fs.existsSync(filePath)) {
        if (file === "node_modules") {
          
          fs.rmdirSync(filePath, { recursive: true });
        } else {
        
          fs.unlinkSync(filePath);
        }
        console.log(`Deleted ${filePath}`);
      }
    });

    //***** Successfully created project *******//
    console.log("Project created successfully at:", projectDir);
  } catch (err) {
    //***** Handle errors during project creation *******//
    console.error("Error creating project:", err.message);
    process.exit(1);
  }
})();
