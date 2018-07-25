using Microsoft.Azure.KeyVault;
using Microsoft.Azure.KeyVault.Models;
using Microsoft.Azure.Services.AppAuthentication;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace RecommendationEngine.Helpers
{
    public class Uitls
    {
        public static async Task<string> GetTokenFromKeyVault(string tokenName)
        {
            string url = "https://aadpkeyvault.vault.azure.net/";
            AzureServiceTokenProvider azureTokenProvider = new AzureServiceTokenProvider();
            KeyVaultClient keyVaultClient = new KeyVaultClient(new KeyVaultClient.AuthenticationCallback(azureTokenProvider.KeyVaultTokenCallback));
            SecretBundle secret = keyVaultClient.GetSecretAsync(url, tokenName).Result;
            string client_secret = secret.Value;
            return client_secret;
        }
    }
}