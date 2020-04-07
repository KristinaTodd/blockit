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
    internal VaultKeepViewModel Create(VaultKeepViewModel newVaultKeep)
    {
      return _repo.Create(newVaultKeep);
    }

    internal VaultKeepViewModel Delete(int id, string UserId)
    {
      VaultKeepViewModel found = _repo.Get(id);
      if (found.UserId != UserId)
      {
        throw new UnauthorizedAccessException("Invalid Request");
      }
      if (_repo.Delete(id))
      {
        return found;
      }
      throw new Exception("Something went terribly wrong");
    }
  }
}