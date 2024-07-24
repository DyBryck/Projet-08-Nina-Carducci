import glob from "glob";
import imagemin from "imagemin";
import imageminWebp from "imagemin-webp";

async function optimizeImages() {
  const files = glob.sync("assets/images/**/*.{jpg,png,webp}");

  await imagemin(files, {
    destination: "assets/images/build",
    plugins: [imageminWebp({ quality: 50 })],
  });

  console.log("Images optimized");
}

optimizeImages();
