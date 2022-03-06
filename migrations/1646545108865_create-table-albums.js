/* eslint-disable camelcase */

exports.up = (pgm) => {
	pgm.createTable('albums', {
		id: {
			type: 'varchar(50)',
			primaryKey: true,
		},
		name: {
			type: 'varchar(255)',
			notNull: true,
		},
		year: {
			type: 'integer',
			notNull: true,
		},
	});
	pgm.createTable('songs', {
		id: 'id',
		title: {
			type: 'varchar(255)',
			notNull: true,
		},
		year: {
			type: 'integer',
			notNull: true,
		},
		genre: {
			type: 'varchar(255)',
			notNull: true,
		},
		performer: {
			type: 'varchar(255)',
			notNull: true,
		},
		duration: {
			type: 'integer',
		},
		albumId: {
			type: 'varchar(50)',
			notNull: true,
			references: 'albums',
			onDelete: 'cascade',
		},
	});
};

exports.down = (pgm) => {
	pgm.dropTable('songs');
	pgm.dropTable('albums');
};
