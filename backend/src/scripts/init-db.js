const { sequelize } = require('../config/db');
const Author = require('../models/postgres/author');
const Book = require('../models/postgres/book');

Book.belongsTo(Author, { foreignKey: 'author_id' });
Author.hasMany(Book, { foreignKey: 'author_id' });

async function syncAndSeed() {
  await sequelize.sync({ force: true });

  const author1 = await Author.create({
    name: 'Jane Austen',
    biography: 'English novelist known for her six major novels.',
    born_date: '1775-12-16'
  });
  const author2 = await Author.create({
    name: 'George Orwell',
    biography: 'English novelist, essayist, journalist and critic.',
    born_date: '1903-06-25'
  });

  await Book.create({
    title: 'Pride and Prejudice',
    description: 'A romantic novel of manners.',
    published_date: '1813-01-28',
    author_id: author1.id
  });
  await Book.create({
    title: '1984',
    description: 'A dystopian social science fiction novel.',
    published_date: '1949-06-08',
    author_id: author2.id
  });

  console.log('Database synced and sample data added.');
  process.exit();
}

syncAndSeed(); 