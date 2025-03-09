'use server';

import { db } from '../db';
import dayjs from 'dayjs';

export const borrowBook = async (params: BorrowBookParams) => {
  const { userId, bookId } = params;

  try {
    console.log('tryyy');
    const book = await db.books.findUnique({
      where: {
        id: bookId,
      },
    });
    console.log('book', book);

    if (!book || book.availableCopies <= 0) {
      return {
        success: false,
        error: 'Book is not available for borrowing',
      };
    }

    const dueDate = dayjs().add(7, 'day').toDate().toDateString();
    console.log('dueDate', dueDate);
    console.log({
      userId,
      bookId,
      dueDate,
      status: 'BORROWED',
    });

    if (!userId || !bookId || !dueDate) {
      console.log('Missing required fields: userId, bookId, or dueDate');
    }

    // const record = await db.borrowRecords.create({
    //   data: {
    //     userId,
    //     bookId,
    //     dueDate,
    //     status: 'BORROWED',
    //   },
    // });
    // console.log('record', record);
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
      data: JSON.parse(JSON.stringify('record')),
    };
  } catch (error) {
    console.log(error);
    return {
      success: false,
      error: 'An error occurred',
    };
  }
};
