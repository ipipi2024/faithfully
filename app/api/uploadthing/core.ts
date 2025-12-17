import { createUploadthing, type FileRouter } from "uploadthing/next";
import { auth } from "@/auth";

const f = createUploadthing({
  errorFormatter: (err) => {
    console.error("UploadThing error:", err);
    return {
      message: err.message,
    };
  },
});

export const ourFileRouter = {
  productImage: f({ image: { maxFileSize: "4MB", maxFileCount: 2 } })
    .middleware(async (req) => {
      try {
        const session = await auth();

        if (!session?.user) {
          console.error("No session found in uploadthing middleware");
          throw new Error("Unauthorized");
        }

        console.log("Upload authorized for user:", session.user.email);
        return { userId: session.user.email };
      } catch (error) {
        console.error("Error in uploadthing middleware:", error);
        throw error;
      }
    })
    .onUploadComplete(async ({ metadata, file }) => {
      console.log("Upload complete for userId:", metadata.userId);
      console.log("file url", file.url);

      return { uploadedBy: metadata.userId, url: file.url };
    }),
} satisfies FileRouter;

export type OurFileRouter = typeof ourFileRouter;
