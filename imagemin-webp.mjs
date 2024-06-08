import { readdir } from "fs/promises";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";
import { join } from "path";

async function getFilesRecursively(dir) {
  const dirents = await readdir(dir, { withFileTypes: true });
  const files = await Promise.all(
    dirents.map((dirent) => {
      const res = join(dir, dirent.name);
      return dirent.isDirectory() ? getFilesRecursively(res) : res;
    })
  );
  return Array.prototype.concat(...files);
}

getFilesRecursively("./assets/images")
  .then(async (files) => {
    const imageFiles = files.filter((file) => /\.(jpg|png)$/i.test(file));

    if (imageFiles.length === 0) {
      console.log("Aucune image à optimiser trouvée.");
      return;
    }

    await imagemin(imageFiles, {
      destination: "./assets/images/build",
      plugins: [imageminWebp({ quality: 50 })],
    });

    console.log("Images optimisées avec succès !");
  })
  .catch((error) => {
    console.error("Erreur lors de la recherche des fichiers :", error);
  });
