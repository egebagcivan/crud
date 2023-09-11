import { TRPCError } from "@trpc/server";
import { z } from "zod";

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
});
