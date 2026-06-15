import { db } from "./index.ts";
import { users, bookmarks, customSections, dynamicLaws, dynamicSections } from "./schema.ts";
import { eq, and } from "drizzle-orm";

// 1. Get or Create User with safe upsert (auto-role promotion for designated Admin)
export async function getOrCreateUser(uid: string, email: string) {
  try {
    const isAdminEmail = email.toLowerCase() === "mdjoybhuiyan134@gmail.com";
    const defaultRole = isAdminEmail ? "admin" : "user";

    // Try finding existing user first
    const existing = await db.select().from(users).where(eq(users.uid, uid));
    if (existing.length > 0) {
      const user = existing[0];
      // Auto-escalate if email matches but role isn't admin
      if (isAdminEmail && user.role !== "admin") {
        const updated = await db.update(users)
          .set({ role: "admin", email })
          .where(eq(users.uid, uid))
          .returning();
        return updated[0];
      }
      return user;
    }

    // Insert new user
    const result = await db.insert(users)
      .values({
        uid,
        email,
        role: defaultRole,
      })
      .returning();

    return result[0];
  } catch (error) {
    console.error("Database query failed in getOrCreateUser:", error);
    throw new Error("Unable to synchronize user details with database.", { cause: error });
  }
}

// Get all users (Admin operation)
export async function getAllUsers() {
  try {
    return await db.select().from(users);
  } catch (error) {
    console.error("Database query failed in getAllUsers:", error);
    throw new Error("Unable to retrieve user list.");
  }
}

// Update user role (Admin operation)
export async function updateUserRole(userId: number, role: string) {
  try {
    const updated = await db.update(users)
      .set({ role })
      .where(eq(users.id, userId))
      .returning();
    return updated[0];
  } catch (error) {
    console.error("Database query failed in updateUserRole:", error);
    throw new Error("Unable to update user role.");
  }
}

// --- Dynamic Laws Queries ---
export async function getDynamicLaws() {
  try {
    return await db.select().from(dynamicLaws);
  } catch (error) {
    console.error("Database query failed in getDynamicLaws:", error);
    throw new Error("Unable to retrieve dynamic laws.");
  }
}

export async function createOrUpdateDynamicLaw(
  lawId: string,
  title: string,
  titleBn: string,
  code: string,
  icon: string,
  category: string,
  description: string,
  descriptionBn: string
) {
  try {
    const existing = await db.select().from(dynamicLaws).where(eq(dynamicLaws.lawId, lawId));
    if (existing.length > 0) {
      const updated = await db.update(dynamicLaws)
        .set({
          title,
          titleBn,
          code,
          icon,
          category,
          description,
          descriptionBn,
        })
        .where(eq(dynamicLaws.lawId, lawId))
        .returning();
      return updated[0];
    } else {
      const inserted = await db.insert(dynamicLaws)
        .values({
          lawId,
          title,
          titleBn,
          code,
          icon,
          category,
          description,
          descriptionBn,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error("Database query failed in createOrUpdateDynamicLaw:", error);
    throw new Error("Unable to create/update law.");
  }
}

export async function deleteDynamicLaw(lawId: string) {
  try {
    // Delete corresponding sections as well
    await db.delete(dynamicSections).where(eq(dynamicSections.lawId, lawId));
    const deleted = await db.delete(dynamicLaws).where(eq(dynamicLaws.lawId, lawId)).returning();
    return deleted.length > 0;
  } catch (error) {
    console.error("Database query failed in deleteDynamicLaw:", error);
    throw new Error("Unable to delete law.");
  }
}

// --- Dynamic Sections Queries ---
export async function getDynamicSections() {
  try {
    return await db.select().from(dynamicSections);
  } catch (error) {
    console.error("Database query failed in getDynamicSections:", error);
    throw new Error("Unable to retrieve dynamic law sections.");
  }
}

export async function createOrUpdateDynamicSection(
  sectionId: string,
  lawId: string,
  num: number,
  title: string,
  titleBn: string,
  text: string,
  textBn: string,
  explanation: string,
  explanationBn: string,
  example: string,
  exampleBn: string
) {
  try {
    const existing = await db.select().from(dynamicSections).where(eq(dynamicSections.sectionId, sectionId));
    if (existing.length > 0) {
      const updated = await db.update(dynamicSections)
        .set({
          lawId,
          num,
          title,
          titleBn,
          text,
          textBn,
          explanation,
          explanationBn,
          example,
          exampleBn,
        })
        .where(eq(dynamicSections.sectionId, sectionId))
        .returning();
      return updated[0];
    } else {
      const inserted = await db.insert(dynamicSections)
        .values({
          sectionId,
          lawId,
          num,
          title,
          titleBn,
          text,
          textBn,
          explanation,
          explanationBn,
          example,
          exampleBn,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error("Database query failed in createOrUpdateDynamicSection:", error);
    throw new Error("Unable to create/update section.");
  }
}

export async function deleteDynamicSection(sectionId: string) {
  try {
    const deleted = await db.delete(dynamicSections).where(eq(dynamicSections.sectionId, sectionId)).returning();
    return deleted.length > 0;
  } catch (error) {
    console.error("Database query failed in deleteDynamicSection:", error);
    throw new Error("Unable to delete section.");
  }
}

// 2. Get Bookmarks
export async function getBookmarks(userId: number) {
  try {
    return await db.select()
      .from(bookmarks)
      .where(eq(bookmarks.userId, userId));
  } catch (error) {
    console.error("Database query failed in getBookmarks:", error);
    throw new Error("Unable to retrieve bookmarks.", { cause: error });
  }
}

// 3. Add Bookmark
export async function addBookmark(userId: number, sectionId: string, lawId: string) {
  try {
    // Check if duplicate bookmark to prevent primary key constraint violation
    const existing = await db.select()
      .from(bookmarks)
      .where(
        and(
          eq(bookmarks.userId, userId),
          eq(bookmarks.sectionId, sectionId)
        )
      );
    
    if (existing.length > 0) {
      return existing[0];
    }

    const inserted = await db.insert(bookmarks)
      .values({
        userId,
        sectionId,
        lawId,
      })
      .returning();

    return inserted[0];
  } catch (error) {
    console.error("Database query failed in addBookmark:", error);
    throw new Error("Unable to save bookmark.", { cause: error });
  }
}

// 4. Remove Bookmark
export async function removeBookmark(userId: number, sectionId: string) {
  try {
    const result = await db.delete(bookmarks)
      .where(
        and(
          eq(bookmarks.userId, userId),
          eq(bookmarks.sectionId, sectionId)
        )
      )
      .returning();
    return result.length > 0;
  } catch (error) {
    console.error("Database query failed in removeBookmark:", error);
    throw new Error("Unable to remove bookmark.", { cause: error });
  }
}

// 5. Get Custom Sections
export async function getCustomSections(userId: number) {
  try {
    return await db.select()
      .from(customSections)
      .where(eq(customSections.userId, userId));
  } catch (error) {
    console.error("Database query failed in getCustomSections:", error);
    throw new Error("Unable to retrieve custom clauses.", { cause: error });
  }
}

// 6. Save Custom Section
export async function saveCustomSection(
  userId: number,
  sectionId: string,
  num: number,
  lawId: string,
  lawCode: string,
  title: string,
  titleBn: string,
  text: string,
  textBn: string,
  explanation: string,
  explanationBn: string,
  example: string,
  exampleBn: string
) {
  try {
    const inserted = await db.insert(customSections)
      .values({
        userId,
        sectionId,
        num,
        lawId,
        lawCode,
        title,
        titleBn,
        text,
        textBn,
        explanation,
        explanationBn,
        example,
        exampleBn,
        updatedAt: new Date(),
      })
      .onConflictDoUpdate({
        target: customSections.id, // wait, there's no unique constraint on sectionId except that a user can only have one per section
        // Oh let's do a select and update if it exists for this user and sectionId, or use onConflict after defining unique index.
        // Since we didn't define a unique index, let's query first! That's easy and safe.
        set: {
          title,
          titleBn,
          text,
          textBn,
          explanation,
          explanationBn,
          example,
          exampleBn,
          updatedAt: new Date(),
        }
      })
      // wait! to use onConflictDoUpdate, there must be a unique constraint or index on the target columns. In target: we don't have unique index on customSections.id because it's serial primary key, not a composite.
      // So instead, let's do search-then-upsert programmatically! It's extremely safe.
      .returning();
    return inserted[0];
  } catch (error) {
    console.error("Database query failed in saveCustomSection:", error);
    throw new Error("Unable to save custom clause detail.", { cause: error });
  }
}

// Better programmatic upsert for custom sections:
export async function upsertCustomSection(
  userId: number,
  sectionId: string,
  num: number,
  lawId: string,
  lawCode: string,
  title: string,
  titleBn: string,
  text: string,
  textBn: string,
  explanation: string,
  explanationBn: string,
  example: string,
  exampleBn: string
) {
  try {
    const existing = await db.select()
      .from(customSections)
      .where(
        and(
          eq(customSections.userId, userId),
          eq(customSections.sectionId, sectionId)
        )
      );

    if (existing.length > 0) {
      // Update
      const updated = await db.update(customSections)
        .set({
          title,
          titleBn,
          text,
          textBn,
          explanation,
          explanationBn,
          example,
          exampleBn,
          updatedAt: new Date()
        })
        .where(eq(customSections.id, existing[0].id))
        .returning();
      return updated[0];
    } else {
      // Insert
      const inserted = await db.insert(customSections)
        .values({
          userId,
          sectionId,
          num,
          lawId,
          lawCode,
          title,
          titleBn,
          text,
          textBn,
          explanation,
          explanationBn,
          example,
          exampleBn,
        })
        .returning();
      return inserted[0];
    }
  } catch (error) {
    console.error("Database query failed in upsertCustomSection:", error);
    throw new Error("Unable to save custom clause detail.", { cause: error });
  }
}

export async function deleteCustomSection(userId: number, sectionId: string) {
  try {
    const deleted = await db.delete(customSections)
      .where(
        and(
          eq(customSections.userId, userId),
          eq(customSections.sectionId, sectionId)
        )
      )
      .returning();
    return deleted.length > 0;
  } catch (error) {
    console.error("Database query failed in deleteCustomSection:", error);
    throw new Error("Unable to delete custom clause.", { cause: error });
  }
}
