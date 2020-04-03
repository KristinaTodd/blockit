using System;
using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Dapper;

namespace Keepr.Repositories
{
  public class KeepsRepository
  {
    private readonly IDbConnection _db;

    public KeepsRepository(IDbConnection db)
    {
      _db = db;
    }

    internal IEnumerable<Keep> Get()
    {
      string sql = "SELECT * FROM Keeps WHERE isPrivate = 0;";
      return _db.Query<Keep>(sql);
    }

    internal Keep Create(Keep newKeep)
    {
      string sql = @"
            INSERT INTO keeps
            (name, description, userId, isPrivate, views, shares, keeps)
            VALUES
            (@Title, @Description, @UserId, @IsPrivate, @Views, @Shares, @Keeps);
            SELECT LAST_INSERT_ID()";
      newKeep.Id = _db.ExecuteScalar<int>(sql, newKeep);
      return newKeep;
    }

    internal Keepr Get(int id)
    {
      string sql = "SELECT * FROM keeps WHERE id = @Id";
      return _db.QueryFirstOrDefault<Keepr>(sql, new { Id = id });
    }

    internal IEnumerable<Keep> GetUserKeeps(string UserId)
    {
      string sql = "SELECT * FROM keeps WHERE userId = @UserId";
      return _db.Query<Keepr>(sql, new { UserId });
    }

    internal Keep Edit(Keep updatedKeep)
    {
      string sql = @"
        UPDATE keeps
        SET
            views = @Views,
            shares = @Shares,
            keeps = @Keeps,
        WHERE id = @id
        ";
      _db.Execute(sql, updatedKeep);
      return updatedKeep;
    }

    internal bool Delete(int Id)
    {
      string sql = "DELETE FROM keeps WHERE id = @Id LIMIT 1";
      int removed = _db.Execute(sql, new { Id });
      return removed == 1;
    }
  }
}