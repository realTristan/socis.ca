import { PrismaClient } from "@prisma/client";
import { User } from "next-auth";
import { genId } from "./crypto";

export class Prisma extends PrismaClient {
  constructor() {
    super();
    this.$connect();
    console.log("Prisma connected");
  }

  /**
   * Get a table
   * @param table The table to get
   * @returns The table
   */
  public static readonly getTable = (table: string) => {
    const global = globalThis as any;
    return global.prisma[table];
  };

  /**
   * Finds many rows in a table
   * @param table The table to find in
   * @param opts The find options
   * @returns The rows found
   */
  public static readonly findMany = async <T>(
    table: string,
    opts: any,
  ): Promise<T[]> => {
    const tableRef: any = Prisma.getTable(table);
    return await tableRef.findMany(opts);
  };

  /**
   * Finds a row in a table
   * @param table The table to find in
   * @param opts The find options
   * @returns The row found, or null if it doesn't exist
   */
  public static readonly findOne = async <T>(
    table: string,
    opts: any,
  ): Promise<T | null> => {
    const tableRef: any = Prisma.getTable(table);
    return await tableRef.findFirst(opts);
  };

  /**
   * Creates a row in a table
   * @param table The table to create in
   * @param opts The creation options
   * @returns The created row
   */
  public static readonly create = async <T>(
    table: string,
    opts: any,
  ): Promise<T> => {
    const tableRef: any = Prisma.getTable(table);
    return await tableRef.create(opts);
  };

  /**
   * Updates a row in a table
   * @param table The table to update
   * @param where The where clause to update
   * @param data The data to update
   * @returns The updated row
   */
  public static readonly update = async <T>(
    table: string,
    data: any,
  ): Promise<T> => {
    const tableRef: any = Prisma.getTable(table);
    return await tableRef.update(data);
  };

  /**
   * Deletes a row from a table
   * @param table The table to delete from
   * @param opts The delete options
   * @returns The deleted row
   */
  public static readonly delete = async <T>(
    table: string,
    opts: any,
  ): Promise<T> => {
    const tableRef: any = Prisma.getTable(table);
    return await tableRef.delete(opts);
  };

  /**
   * Get an user by their email
   * @param email The email to get
   * @returns The user
   */
  public static readonly getUserByEmail = async (
    email: string,
  ): Promise<User | null> => {
    return await Prisma.findOne("user", {
      where: {
        email,
      },
    });
  };

  /**
   * Fetch the user data from the database
   * @param userSecret The user's secret
   * @returns The user's data
   */
  public static readonly getUser = async (
    userSecret: string,
  ): Promise<User | null> => {
    const user: User | null = await Prisma.findOne("user", {
      where: {
        secret: userSecret,
      },
    });

    return user;
  };

  /**
   * Fetch all of the users from the database
   * @returns The user's data
   */
  public static readonly getUsers = async (): Promise<(User | null)[]> => {
    return await Prisma.findMany("user", {
      select: {
        id: true,
        name: true,
        email: true,
        image: true,
        permissions: true,
      },
    }); // exclude the user secret
  };

  /**
   * Check whether the user is valid based on their user secret
   * @param userSecret The user secret
   * @returns Whether the user exists
   */
  public static readonly userExists = async (
    userSecret: string,
  ): Promise<boolean> => {
    const user: User | null = await Prisma.findOne("user", {
      where: {
        secret: userSecret,
      },
    });

    return user ? true : false;
  };

  /**
   * Create a new user in the database
   * @param name The user's name
   * @param email The user's email
   * @param image The user's image
   * @param secret The user's secret
   */
  public static readonly createUser = async (
    id: string,
    name: string,
    email: string,
    password: string,
    image: string,
    secret: string,
  ): Promise<User> => {
    const DEFAULT_USER_NAME = "User";
    const DEFAULT_USER_IMAGE = "/images/default-pfp.png";
    const generatedPassword = await genId();

    return await Prisma.create("user", {
      data: {
        id,
        secret,
        email,
        password: password || generatedPassword,
        name: name || DEFAULT_USER_NAME,
        image: image || DEFAULT_USER_IMAGE,
        permissions: [0],
      },
    });
  };

  /**
   * Update the user's name
   * @param name The user's name
   * @param userSecret The user's secret
   */
  public static readonly updateUserName = async (
    name: string,
    userSecret: string,
  ): Promise<User> => {
    return await Prisma.update("user", {
      where: {
        secret: userSecret,
      },
      data: {
        name,
      },
    });
  };

  /**
   * Update the user's image
   * @param image The user's image
   * @param userSecret The user's secret
   */
  public static readonly updateUserImage = async (
    image: string,
    userSecret: string,
  ): Promise<User> => {
    return await Prisma.update("user", {
      where: {
        secret: userSecret,
      },
      data: {
        image,
      },
    });
  };
}

// create a global prisma instance
const global = globalThis as any;
if (!global.prisma) {
  global.prisma = new Prisma();
}
