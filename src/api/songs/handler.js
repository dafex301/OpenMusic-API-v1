const ClientError = require('../../exceptions/ClientError');

class SongsHandler {
	constructor(service, validator) {
		this._service = service;
		this._validator = validator;

		this.postSongHandler = this.postSongHandler.bind(this);
		this.getSongsHandler = this.getSongsHandler.bind(this);
		this.getSongByIdHandler = this.getSongByIdHandler.bind(this);
		this.putSongByIdHandler = this.putSongByIdHandler.bind(this);
		this.deleteSongByIdHandler = this.deleteSongByIdHandler.bind(this);
	}

	async postSongHandler(request, h) {
		try {
			this._validator.validateSongPayload(request.payload);
			const { name, year, genre, performer, duration, albumId } =
				request.payload;
			const songId = await this._service.addSong({
				name,
				year,
				genre,
				performer,
				duration,
				albumId,
			});
			const response = h.response({
				status: 'success',
				message: 'Lagu berhasil ditambahkan',
				data: {
					songId,
				},
			});
			response.code(201);
			return response;
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				});
				response.code(error.statusCode);
				return response;
			}

			// Server Error
			const response = h.response({
				status: 'error',
				message: 'Terjadi kesalahan pada server',
			});
			response.code(500);
			console.error(error);
			return response;
		}
	}

	async getSongsHandler() {
		try {
			const songs = await this._service.getSongs();
			const response = h.response({
				status: 'success',
				message: 'Berhasil mengambil daftar lagu',
				data: {
					songs,
				},
			});
			response.code(200);
			return response;
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				});
				response.code(error.statusCode);
				return response;
			}

			// Server Error
			const response = h.response({
				status: 'error',
				message: 'Terjadi kesalahan pada server',
			});
			response.code(500);
			console.error(error);
			return response;
		}
	}

	async getSongByIdHandler(request, h) {
		try {
			const { songId } = request.params;
			const song = await this._service.getSongById(songId);
			const response = h.response({
				status: 'success',
				message: 'Berhasil mengambil lagu',
				data: {
					song,
				},
			});
			response.code(200);
			return response;
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				});
				response.code(error.statusCode);
				return response;
			}

			// Server Error
			const response = h.response({
				status: 'error',
				message: 'Terjadi kesalahan pada server',
			});
			response.code(500);
			console.error(error);
			return response;
		}
	}

	async putSongByIdHandler(request, h) {
		try {
			this._validator.validateSongPayload(request.payload);
			const { songId } = request.params;
			const { name, year, genre, performer, duration, albumId } =
				request.payload;
			await this._service.updateSong(songId, {
				name,
				year,
				genre,
				performer,
				duration,
				albumId,
			});
			const response = h.response({
				status: 'success',
				message: 'Berhasil mengubah lagu',
			});
			response.code(200);
			return response;
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				});
				response.code(error.statusCode);
				return response;
			}

			// Server Error
			const response = h.response({
				status: 'error',
				message: 'Terjadi kesalahan pada server',
			});
			response.code(500);
			console.error(error);
			return response;
		}
	}

	async deleteSongByIdHandler(request, h) {
		try {
			const { songId } = request.params;
			await this._service.deleteSong(songId);
			const response = h.response({
				status: 'success',
				message: 'Berhasil menghapus lagu',
			});
			response.code(200);
			return response;
		} catch (error) {
			if (error instanceof ClientError) {
				const response = h.response({
					status: 'fail',
					message: error.message,
				});
				response.code(error.statusCode);
				return response;
			}

			// Server Error
			const response = h.response({
				status: 'error',
				message: 'Terjadi kesalahan pada server',
			});
			response.code(500);
			console.error(error);
			return response;
		}
	}
}

module.exports = SongsHandler;
