using System;
using System.Collections.Generic;
using System.Data;
using Keepr.Models;
using Keepr.Repositories;

namespace Keepr.Services
{
  public class VaultsService
  {
    private readonly VaultsRepository _repo;
    public VaultsService(VaultsRepository repo)
    {
      _repo = repo;
    }
    internal IEnumerable<Vault> Get(string currentUser)
    {
      return _repo.Get(currentUser);
    }

    public Vault Create(Vault newVault)
    {
      return _repo.Create(newVault);
    }

    public IEnumerable<Vault> GetUserVaults(string UserId)
    {
      return _repo.GetUserVaults(UserId);
    }

    public Vault GetOne(int id, string userId)
    {

      Vault found = _repo.Get(id);
      if (found == null)
      {
        throw new Exception("Invalid Id");
      }
      if (found.UserId != userId)
      {
        throw new Exception("Invalid Request");
      }
      return found;
    }

    internal IEnumerable<VaultKeepViewModel> GetKeepsByVaultId(int vaultId, string userId)
    {
      return _repo.GetByVaultId(vaultId, userId);
    }

    public Vault Edit(Vault updatedVault)
    {
      Vault found = GetOne(updatedVault.Id, updatedVault.UserId);
      if (found.UserId != updatedVault.UserId)
      {
        throw new Exception("Invalid Request");
      }
      return _repo.Edit(found);
    }

    public Vault Delete(int id, string UserId)
    {
      Vault found = GetOne(id, UserId);
      if (found.UserId != UserId)
      {
        throw new Exception("Invalid Request");
      }
      if (_repo.Delete(id))
      {
        return found;
      }
      throw new Exception("Something went very wrong");
    }

  }
}