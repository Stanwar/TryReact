using FluentValidation;

namespace Application.Validators
{
    public static class ValidatorExtensions
    {
        public static IRuleBuilder<T, string> Password<T>(this IRuleBuilder<T, string> ruleBuilder)
        {
            var options = ruleBuilder
                            .NotEmpty()
                            .MinimumLength(6).WithMessage("Password must be more than 6 characters")
                            .Matches("[A-Z]").WithMessage("Password must contain one upper case letter")
                            .Matches("[a-z]").WithMessage("Password must contain one lower case letter")
                            .Matches("[0-9]").WithMessage("Password must contain a letter")
                            .Matches("[^a-zA-Z0-9]").WithMessage("Password must contain non alphanumeric");
            return options;
        }
    }
}