const admin = require("firebase-admin")
admin.initializeApp()

const DeleteAllDataFunction = require("./src/DeleteAllDataFunction")
exports.DeleteAllDataFunction = DeleteAllDataFunction.handler

const CreateReserveDataCopy = require("./src/CreateReserveDataCopy")
exports.CreateReserveDataCopy = CreateReserveDataCopy.handler

const RemoveReserveDataCopy = require("./src/RemoveReserveDataCopy")
exports.RemoveReserveDataCopy = RemoveReserveDataCopy.handler

const GetStorageData = require("./src/GetStorageData")
exports.GetStorageData = GetStorageData.handler
