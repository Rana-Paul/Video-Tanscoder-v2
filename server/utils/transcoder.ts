const ffmpegStatic = require("ffmpeg-static");
const ffmpeg = require("fluent-ffmpeg");
const path = require("path");

ffmpeg.setFfmpegPath(ffmpegStatic);
const rootPath = path.join(__dirname, "../");

function ffmpegSync(filePath: string, fileName: string, folderName: string) {
  return new Promise<void>((resolve, reject) => {
    ffmpeg()
      .input(filePath)

      .size("640x480")
      // Output file

      .saveToFile(
        rootPath + folderName + `/output/${fileName.split(".")[0]}-480.mp4`
      )

      // The callback that is run when FFmpeg is finished
      .on("end", async (stdout: string, stderr: Error) => {
        ffmpeg()
          .input(filePath)

          .size("1280x720")
          // Output file

          .saveToFile(
            rootPath + folderName + `/output/${fileName.split(".")[0]}-720.mp4`
          )

          // The callback that is run when FFmpeg is finished
          .on("end", async (stdout: string, stderr: Error) => {
            ffmpeg()
              .input(filePath)

              .size("640x360")
              // Output file

              .saveToFile(
                rootPath +
                  folderName +
                  `/output/${fileName.split(".")[0]}-360.mp4`
              )

              // The callback that is run when FFmpeg is finished
              .on("end", async (stdout: string, stderr: Error) => {
                resolve();
              });
          });
      })
      .on("error", (err: any) => {
        return reject(new Error(err));
      });
  });
}

module.exports = ffmpegSync;
