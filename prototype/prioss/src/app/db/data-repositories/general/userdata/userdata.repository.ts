import { Injectable } from "@angular/core";
import { SQLiteDBConnection, capSQLiteChanges } from "@capacitor-community/sqlite";
import { DBService } from "../../../../services/db/db.service";
import * as sql from "./userdata.sql";
import { insertIntoUserdata } from "./userdata.sql";
import { userdataEntry } from "src/app/models/General/userdata/userdataEntry";

/** 
 * This class handles data that is inserted into and extracted from the userdata table. The Table is mainly used for the General-Data visualization.
 * 
 * @author: Max (maxy@mail.upb.de)
 */
@Injectable()
export class UserdataRepository {

    constructor(private dbService: DBService){

    }

    /**
     * This async method adds all userdata to the userdata table.
     * 
     * @author: Max (maxy@mail.upb.de)
     * 
     * @param username 
     * @param email 
     * @param country
     * @param birthdate 
     * @param gender 
     * @param postalCode
     * @param mobileNumber
     * @param mobileOperator
     * @param mobileBrand
     * @param creationTime
     */
    async adduserdata(username: string, email: string, country: string, birthdate: string, gender: string, postalCode: number, mobileNumber: number, mobileOperator: string, mobileBrand: string, creationTime: string) {
        await this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {

            let sqlStatement = insertIntoUserdata;
            let values = [username, email, country, birthdate, gender, postalCode, mobileNumber, mobileOperator, mobileBrand, creationTime];
       
            let ret: capSQLiteChanges = await db.run(sqlStatement, values);
          });
    }

    /**
     * This async method fetches all entries in the userdata table.
     * 
     * @author: Max (maxy@mail.upb.de)
     * 
     */
    async getAlluserdata() : Promise<userdataEntry[]> {
      return this.dbService.executeQuery<any>(async (db: SQLiteDBConnection) => {
  
        let result = await db.query(sql.selectAllUserdata);
        return result.values as userdataEntry[];
  
      });
    }
  }