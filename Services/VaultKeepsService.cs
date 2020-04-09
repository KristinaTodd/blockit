using System;
using System.Collections.Generic;
using Keepr.Models;
using Keepr.Repositories;

namespace Keepr.Services
{
  public class VaultKeepsService
  {
    private readonly VaultKeepsRepository _repo;
    public VaultKeepsService(VaultKeepsRepository repo)
    {
      _repo = repo;
    }
    internal VaultKeep Create(VaultKeep newVaultKeep)
    {
      return _repo.Create(newVaultKeep);
    }

    internal string Delete(int id, string UserId)
    {
      var found = _repo.Get(id);
      if (found.UserId != UserId)
      {
        throw new UnauthorizedAccessException("Invalid Request");
      }
      if (_repo.Delete(id))
      {
        return "Deleted";
      }
      throw new Exception("Something went terribly wrong");
    }
  }
}