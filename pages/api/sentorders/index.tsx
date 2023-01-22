import type { NextApiRequest, NextApiResponse } from "next";
import { unstable_getServerSession } from "next-auth";
import prisma from "../../../lib/prisma";
import { authOptions } from "../auth/[...nextauth]";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  const session = await unstable_getServerSession(req, res, authOptions);
  if (!session) {
    res.status(401).json({ message: "Unauthenticated" });
    return;
  }
  if (req.method === "GET") {
    const result = await prisma.house.findMany();
    res.status(200).json(result);
  }
  if (req.method === "POST") {
    const { houseId } = req.body;
    const result = await prisma.order.create({
      data: {
        house: { connect: { id: houseId } },
        client: { connect: { email: session.user?.email! } },
      },
    });
    if (!result) {
      res.status(400).json({ message: "Error occurs" });
      return;
    } else {
      res.status(201).json(result);
      return;
    }
  }
}
