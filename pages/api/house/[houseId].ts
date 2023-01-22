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
  if (req.method === "PUT") {
    const { square, price, bedroom, bathroom, image } = req.body;
    const id = req.query["houseId"] as string;
    if (image) {
      const result = await prisma.house.update({
        data: {
          square: square,
          price: price,
          bathroom: bathroom,
          bedroom: bedroom,
          image: image,
        },
        where: { id: id },
      });
      if (!result) {
        res.status(400).json({ message: "Error occurs" });
        return;
      } else {
        res.status(201).json(result);
        return;
      }
    } else {
      const result = await prisma.house.update({
        data: {
          square: square,
          price: price,
          bathroom: bathroom,
          bedroom: bedroom,
        },
        where: { id: id },
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
  if (req.method === "DELETE") {
    const id = req.query["houseId"] as string;
    const result = await prisma.house.delete({ where: { id: id } });
    if (!result) {
      res.status(400).json({ message: "Error occurs" });
      return;
    } else {
      res.status(201).json(result);
      return;
    }
  }
}
