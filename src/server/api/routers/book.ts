import { TRPCError } from "@trpc/server";
import { z } from "zod";
import { S3 } from "aws-sdk";

export const config = {
  api: {
    // important! otherwise the body signature check will fail
    bodyParser: false,
  },
};
import {
  createTRPCRouter,
  protectedProcedure,
  publicProcedure,
} from "~/server/api/trpc";

export const bookRouter = createTRPCRouter({
  getAll: protectedProcedure.query(({ ctx }) => {
    return ctx.prisma.books.findMany();
  }),

  deleteBook: protectedProcedure
  .input(z.object({ id: z.string() }))
  .mutation(async ({ ctx, input }) => {
    const book = await ctx.prisma.books.findUnique({
      where: {
        id: input.id,
      },
    });
    if(!book) throw new TRPCError({ code: "NOT_FOUND", message: "Book not found" });
    return ctx.prisma.books.delete({
      where: {
        id: input.id,
      },
    });
  }),

  createBook: protectedProcedure
  .input(
    z.object({
      title: z.string(),
      author: z.string(),
      description: z.string(),
      image: z.string(),
      link: z.string(),
    }))
  .mutation(async ({ ctx, input }) => {
    return ctx.prisma.books.create({
      data: input,
    });
  }),

  updateBook: protectedProcedure
  .input(
    z.object({
      id: z.string(),
      title: z.string(),
      author: z.string(),
      description: z.string(),
      image: z.string(),
      link: z.string(),
    }))
  .mutation(async ({ ctx, input }) => {
    const book = await ctx.prisma.books.findUnique({
      where: {
        id: input.id,
      },
    });
    if(!book) throw new TRPCError({ code: "NOT_FOUND", message: "Book not found" });
    return ctx.prisma.books.update({
      where: {
        id: input.id,
      },
      data: input,
    });
  }),

  uploadImage: protectedProcedure
  .input(z.object({
    file: z.string(),
    fileName: z.string(),
  }))
  .mutation(async ({ ctx, input }) => {
    const s3 = new S3({
      accessKeyId: process.env.AWS_ACCESS_KEY_ID,
      secretAccessKey: process.env.AWS_SECRET_ACCESS_KEY,
    });
    const base64Data = input.file.split(",")[1];
    const params = {
      Bucket: process.env.AWS_BUCKET_NAME!,
      Key: input.fileName,
      Body: Buffer.from(base64Data!, 'base64'), // Assuming the file will be sent as a base64 encoded string
      ContentType: 'image/jpeg',
      ACL: 'public-read',
      };

    await s3.upload(params).promise();
    const result = `https://${process.env.AWS_BUCKET_NAME}.s3.amazonaws.com/${input.fileName}`;
    return result;
  })
});
