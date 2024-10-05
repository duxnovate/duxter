import fs from "fs";
import path from "path";

const createResource = (name: string) => {
  const baseDir = path.resolve(process.cwd(), name);

  const dirs = ["models", "controllers", "plugins", "utils"];

  dirs.forEach((dir) => {
    const dirPath = path.join(baseDir, dir);
    if (!fs.existsSync(dirPath)) {
      fs.mkdirSync(dirPath, { recursive: true });
      console.log(`Created folder: ${dirPath}`);
    } else {
      console.log(`Folder already exists: ${dirPath}`);
    }
  });

  // Example to create an empty file in each folder
  dirs.forEach((dir) => {
    const filePath = path.join(baseDir, dir, "index.ts");
    if (!fs.existsSync(filePath)) {
      fs.writeFileSync(filePath, `// ${dir} entry point`);
      console.log(`Created file: ${filePath}`);
    }
  });
};

export default createResource;
