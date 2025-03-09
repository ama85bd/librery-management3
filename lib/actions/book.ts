'use server';

import { db } from '../db';
import dayjs from 'dayjs';

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    const book = await db.books.findUnique({
      where: {
        id: bookId,
      },
    });

    if (!book || book.availableCopies <= 0) {
      return {
        success: false,
        error: 'Book is not available for borrowing',
      };
    }

    const dueDate = dayjs().add(7, 'day').toDate().toDateString();

    if (!userId || !bookId || !dueDate) {
      console.log('Missing required fields: userId, bookId, or dueDate');
    }

    const record = await db.borrowRecords.create({
      data: {
        userId,
        bookId,
        dueDate: new Date(dueDate),
        status: 'BORROWED',
      },
    });
    await db.books.update({
      where: {
        id: bookId,
      },
      data: {
        availableCopies: book.availableCopies - 1,
      },
    });

    return {
      success: true,
      data: JSON.parse(JSON.stringify(record)),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'An error occurred',
    };
  }
};
